const mongoose = require('mongoose');

const careerRoadmapProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resultId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AssessmentResult',
      required: true,
      index: true,
    },
    careerId: {
      type: String,
      required: true,
      trim: true,
    },
    completedActionKeys: {
      type: [String],
      default: [],
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

careerRoadmapProgressSchema.index({ userId: 1, resultId: 1, careerId: 1 }, { unique: true });

module.exports = mongoose.model('CareerRoadmapProgress', careerRoadmapProgressSchema);
