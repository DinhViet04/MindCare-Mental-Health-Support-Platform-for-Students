const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert',
        required: true
    },
    date: {
        type: Date,
        required: [true, 'Ngày hẹn là bắt buộc']
    },
    startTime: {
        type: String,
        required: [true, 'Giờ bắt đầu là bắt buộc']
    },
    endTime: {
        type: String,
        required: [true, 'Giờ kết thúc là bắt buộc']
    },
    duration: {
        type: Number, // minutes
        required: true,
        default: 60
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
        default: 'pending'
    },
    type: {
        type: String,
        enum: ['video', 'chat', 'voice'],
        default: 'video'
    },
    reason: {
        type: String,
        required: [true, 'Lý do tư vấn là bắt buộc']
    },
    notes: String,
    cancellationReason: String,
    rescheduleHistory: [{
        fromDate: Date,
        fromTime: String,
        toDate: Date,
        toTime: String,
        reason: String,
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        changedAt: {
            type: Date,
            default: Date.now
        }
    }],
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    paymentAmount: Number,
    meetingLink: String,
    reminders: {
        emailSent: { type: Boolean, default: false },
        pushSent: { type: Boolean, default: false },
        reminderTime: Date
    }
}, {
    timestamps: true
});

// Index for efficient queries
bookingSchema.index({ student: 1, date: -1 });
bookingSchema.index({ expert: 1, date: -1 });
bookingSchema.index({ status: 1, date: 1 });

module.exports = mongoose.model('Booking', bookingSchema);