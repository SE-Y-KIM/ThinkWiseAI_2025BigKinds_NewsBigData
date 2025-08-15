'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChartDisplay from './ChartDisplay';

// 데이터 타입 정의
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AnalysisResult {
  title: string;
  summary: string;
  chartData: any;
  followUpQuestions: string[];
}

// props 타입 정의
interface ChatInterfaceProps {
  initialMessage?: string;
}

export default function ChatInterface({ initialMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [streamingContent, setStreamingContent] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = { role: 'user', content: messageContent };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setAnalysisResult(null);
    setStreamingContent('');
    setCurrentStatus('');

    try {
      // 새로운 고급 AI 분석 API 사용
      const response = await fetch('http://localhost:8000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: messageContent }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      // Server-Sent Events (SSE) 스트리밍 응답 처리
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) throw new Error('Response body not available');

      let fullContent = '';
      let followUpQuestions: string[] = [];
      let isAnalysisComplete = false;

      console.log('Starting SSE stream processing...');

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log('Stream completed');
            break;
          }

          const chunk = decoder.decode(value);
          console.log('Received chunk:', chunk);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              console.log('Processing data line:', data);
              
              // 중복된 data: 형식 처리 (data: data: 내용)
              if (data.startsWith('data: ')) {
                const actualContent = data.slice(6);
                console.log('Double data format, actual content:', actualContent);
                if (actualContent.trim()) {
                  fullContent += actualContent;
                  setStreamingContent(fullContent);
                }
              }
              // 이벤트 타입과 데이터를 정확히 파싱
              else if (data.includes('event: status')) {
                // 상태 업데이트 처리
                const statusMatch = data.match(/data: (.+)/);
                if (statusMatch) {
                  console.log('Status update:', statusMatch[1]);
                  setCurrentStatus(statusMatch[1]);
                }
              } else if (data.includes('event: message')) {
                // AI 응답 메시지 처리
                const messageMatch = data.match(/data: (.+)/);
                if (messageMatch) {
                  const content = messageMatch[1];
                  console.log('Message content:', content);
                  fullContent += content;
                  setStreamingContent(fullContent);
                }
              } else if (data.includes('event: end')) {
                // 분석 완료
                console.log('Analysis completed');
                isAnalysisComplete = true;
                break;
              } else if (data.trim() && !data.startsWith('event:')) {
                // 이벤트가 아닌 일반 데이터 처리
                console.log('Direct data:', data);
                fullContent += data;
                setStreamingContent(fullContent);
              }
            } else if (line.trim() && line.includes('data:')) {
              // data: 로 시작하지 않지만 data:를 포함하는 라인 처리
              const dataMatch = line.match(/data: (.+)/);
              if (dataMatch) {
                const content = dataMatch[1];
                console.log('Alternative data format:', content);
                if (content.trim()) {
                  fullContent += content;
                  setStreamingContent(fullContent);
                }
              }
            }
          }

          if (isAnalysisComplete) break;
        }
      } catch (streamError) {
        console.error('Streaming error:', streamError);
        // 스트리밍 오류가 발생해도 수집된 내용은 처리
      }

      console.log('Final content:', fullContent);

      // 스트리밍 완료 후 결과 정리
      if (fullContent.trim()) {
        const assistantMessage: Message = { role: 'assistant', content: fullContent };
        setMessages((prev) => [...prev, assistantMessage]);

        // 꼬리질문 추출 (간단한 패턴 매칭)
        const questionMatches = fullContent.match(/[0-9]+\..*?\?/g);
        if (questionMatches) {
          followUpQuestions = questionMatches.slice(0, 3).map(q => q.trim());
        }

        setAnalysisResult({
          title: `${messageContent} 분석 결과`,
          summary: fullContent,
          chartData: null, // 새로운 API에서는 차트 데이터를 별도로 제공하지 않음
          followUpQuestions: followUpQuestions
        });
      } else {
        // 내용이 없는 경우 오류 메시지 표시
        const errorMessage: Message = { role: 'assistant', content: 'AI 분석 결과를 받지 못했습니다. 다시 시도해주세요.' };
        setMessages((prev) => [...prev, errorMessage]);
      }

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { role: 'assistant', content: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setStreamingContent('');
      setCurrentStatus('');
    }
  };

  // 컴포넌트가 처음 로드될 때 initialMessage가 있으면 바로 분석을 시작
  useEffect(() => {
    if (initialMessage) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleFollowUpClick = (question: string) => {
    handleSendMessage(question);
  }

  return (
    <div className="bg-surface rounded-lg p-6 flex flex-col h-full border border-border-color">
      {isLoading && (
        <div className="flex-1 flex flex-col justify-center items-center">
          {currentStatus && (
            <div className="mb-4 text-center">
              <div className="text-primary font-medium">{currentStatus}</div>
            </div>
          )}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary shadow-lg shadow-primary/30"></div>
          <p className="mt-4 text-text-secondary">AI가 데이터를 분석하고 있습니다...</p>
          
          {/* 스트리밍 중인 내용 표시 */}
          {streamingContent && (
            <div className="mt-4 p-4 bg-background rounded-lg border border-border-color max-w-2xl w-full">
              <div className="text-sm text-text-secondary mb-2">실시간 분석 결과:</div>
              <div className="text-text-primary whitespace-pre-wrap">{streamingContent}</div>
            </div>
          )}
        </div>
      )}

      {!isLoading && !analysisResult && (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold text-text-primary">새 분석 시작하기</h1>
          <p className="text-text-secondary mt-2">이전 대화기록을 확인하거나, 새 분석을 시작하세요.</p>
        </div>
      )}
      
      {analysisResult && (
        <div className="flex-1 overflow-y-auto pr-2">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">{analysisResult.title}</h2>
          
          {/* 차트가 있는 경우에만 표시 */}
          {analysisResult.chartData && (
            <div className="mb-6">
              <ChartDisplay chartData={analysisResult.chartData} />
            </div>
          )}
          
          <div className="mb-6 p-4 bg-background rounded-lg border border-border-color">
            <h3 className="font-semibold mb-3 text-text-primary">AI 분석 결과:</h3>
            <div className="text-text-primary leading-relaxed whitespace-pre-wrap">
              {analysisResult.summary}
            </div>
          </div>
          
          {analysisResult.followUpQuestions.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-text-primary">AI의 꼬리질문으로 생각을 확장해보세요:</h3>
              <div className="flex flex-col space-y-2">
                {analysisResult.followUpQuestions.map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleFollowUpClick(q)}
                    className="text-left p-3 bg-background hover:bg-surface rounded-lg transition-all duration-300 text-text-primary border border-border-color hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* 하단 입력창 */}
      <div className="mt-6 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage(input)}
          className="w-full p-4 pr-12 bg-background border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder-text-secondary transition-all duration-300"
          placeholder="AI에게 질문하거나, 다음 분석을 요청하세요..."
          disabled={isLoading}
        />
        <button
          onClick={() => handleSendMessage(input)}
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-background rounded-md hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
