const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '리포트 제목은 필수입니다.'],
    trim: true,
    maxlength: [200, '제목은 200자를 초과할 수 없습니다.']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, '설명은 1000자를 초과할 수 없습니다.']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['keyword', 'trend', 'competitor', 'market', 'custom'],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'processing', 'completed', 'failed'],
    default: 'draft'
  },
  data: {
    keywords: [String],
    sources: [String],
    dateRange: {
      start: Date,
      end: Date
    },
    filters: {
      language: {
        type: String,
        default: 'ko'
      },
      region: String,
      industry: String,
      sentiment: {
        type: String,
        enum: ['positive', 'negative', 'neutral', 'all'],
        default: 'all'
      }
    }
  },
  analysis: {
    summary: String,
    keyInsights: [{
      title: String,
      description: String,
      impact: {
        type: String,
        enum: ['high', 'medium', 'low']
      }
    }],
    trends: [{
      name: String,
      description: String,
      growth: Number,
      period: String
    }],
    recommendations: [{
      title: String,
      description: String,
      priority: {
        type: String,
        enum: ['high', 'medium', 'low']
      }
    }]
  },
  visualizations: [{
    type: {
      type: String,
      enum: ['chart', 'graph', 'table', 'wordcloud', 'timeline'],
      required: true
    },
    title: String,
    description: String,
    data: mongoose.Schema.Types.Mixed,
    config: mongoose.Schema.Types.Mixed,
    order: Number
  }],
  metadata: {
    processingTime: Number,
    dataPoints: Number,
    sourcesCount: Number,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  settings: {
    isPublic: {
      type: Boolean,
      default: false
    },
    allowSharing: {
      type: Boolean,
      default: true
    },
    autoRefresh: {
      type: Boolean,
      default: false
    },
    refreshInterval: {
      type: Number,
      default: 24 // hours
    }
  },
  tags: [String],
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for report summary
reportSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    title: this.title,
    type: this.type,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    keyInsightsCount: this.analysis?.keyInsights?.length || 0,
    visualizationsCount: this.visualizations?.length || 0
  };
});

// Indexes for better query performance
reportSchema.index({ userId: 1, createdAt: -1 });
reportSchema.index({ type: 1, status: 1 });
reportSchema.index({ 'data.keywords': 1 });
reportSchema.index({ tags: 1 });
reportSchema.index({ status: 1, createdAt: -1 });

// Pre-save middleware to update metadata
reportSchema.pre('save', function(next) {
  if (this.isModified('analysis') || this.isModified('visualizations')) {
    this.metadata.lastUpdated = new Date();
  }
  next();
});

// Instance method to add insight
reportSchema.methods.addInsight = function(insight) {
  if (!this.analysis.keyInsights) {
    this.analysis.keyInsights = [];
  }
  this.analysis.keyInsights.push(insight);
  return this.save();
};

// Instance method to add visualization
reportSchema.methods.addVisualization = function(visualization) {
  if (!this.visualizations) {
    this.visualizations = [];
  }
  visualization.order = this.visualizations.length + 1;
  this.visualizations.push(visualization);
  return this.save();
};

// Instance method to update status
reportSchema.methods.updateStatus = function(status) {
  this.status = status;
  if (status === 'completed') {
    this.metadata.lastUpdated = new Date();
  }
  return this.save();
};

// Static method to find reports by user
reportSchema.statics.findByUser = function(userId, options = {}) {
  const query = { userId };
  
  if (options.status) {
    query.status = options.status;
  }
  
  if (options.type) {
    query.type = options.type;
  }
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(options.limit || 50)
    .populate('userId', 'name email');
};

// Static method to find public reports
reportSchema.statics.findPublic = function(options = {}) {
  const query = { 'settings.isPublic': true, status: 'completed' };
  
  if (options.type) {
    query.type = options.type;
  }
  
  if (options.tags && options.tags.length > 0) {
    query.tags = { $in: options.tags };
  }
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(options.limit || 20)
    .populate('userId', 'name company');
};

// Static method to get report statistics
reportSchema.statics.getReportStats = function(userId) {
  return this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model('Report', reportSchema);

