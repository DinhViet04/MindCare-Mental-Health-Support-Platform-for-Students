const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: [true, 'Giới thiệu bản thân là bắt buộc'],
        maxlength: [1000, 'Giới thiệu không quá 1000 ký tự']
    },
    specialization: [{
        type: String,
        required: [true, 'Chuyên môn là bắt buộc']
    }],
    qualifications: [{
        degree: String,
        institution: String,
        year: Number,
        certificate: String
    }],
    experience: {
        type: Number,
        required: [true, 'Số năm kinh nghiệm là bắt buộc'],
        min: [0, 'Kinh nghiệm không thể âm']
    },
    consultationFee: {
        type: Number,
        required: [true, 'Phí tư vấn là bắt buộc'],
        min: [0, 'Phí tư vấn không thể âm']
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    totalSessions: {
        type: Number,
        default: 0
    },
    languages: [String],
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    verificationDocuments: [{
        type: String,
        required: true
    }],
    availability: [{
        dayOfWeek: {
            type: Number,
            min: 0,
            max: 6
        },
        startTime: String,
        endTime: String,
        isAvailable: {
            type: Boolean,
            default: true
        }
    }],
    leaveDays: [{
        startDate: Date,
        endDate: Date,
        reason: String
    }],
    bankAccount: {
        bankName: String,
        accountNumber: String,
        accountHolder: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expert', expertSchema);