const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '이름은 필수입니다.'],
    trim: true,
    maxlength: [50, '이름은 50자를 초과할 수 없습니다.']
  },
  email: {
    type: String,
    required: [true, '이메일은 필수입니다.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      '유효한 이메일 주소를 입력해주세요.'
    ]
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다.'],
    minlength: [8, '비밀번호는 최소 8자 이상이어야 합니다.'],
    select: false
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'pro', 'enterprise'],
    default: 'free'
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, '회사명은 100자를 초과할 수 없습니다.']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
  preferences: {
    language: {
      type: String,
      default: 'ko'
    },
    timezone: {
      type: String,
      default: 'Asia/Seoul'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  },
  usage: {
    reportsGenerated: {
      type: Number,
      default: 0
    },
    apiCalls: {
      type: Number,
      default: 0
    },
    storageUsed: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for user's full profile
userSchema.virtual('fullProfile').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    plan: this.plan,
    company: this.company,
    role: this.role,
    isActive: this.isActive,
    isEmailVerified: this.isEmailVerified,
    lastLogin: this.lastLogin,
    preferences: this.preferences,
    usage: this.usage,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ plan: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Static method to find active users
userSchema.statics.findActiveUsers = function() {
  return this.find({ isActive: true });
};

// Static method to find users by plan
userSchema.statics.findByPlan = function(plan) {
  return this.find({ plan, isActive: true });
};

// Static method to get user statistics
userSchema.statics.getUserStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$plan',
        count: { $sum: 1 },
        activeUsers: {
          $sum: { $cond: ['$isActive', 1, 0] }
        }
      }
    }
  ]);
};

module.exports = mongoose.model('User', userSchema);

