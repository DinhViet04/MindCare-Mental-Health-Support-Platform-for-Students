import React, { useState } from 'react';
import { FiCalendar, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const ExpertSchedulePage: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedSlots, setSelectedSlots] = useState<string[]>(['09:00', '10:00', '14:00']);

    const toggleSlot = (slot: string) => {
        setSelectedSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <FiCalendar className="text-teal-500 w-6 h-6" />
                    <h1 className="text-2xl font-bold text-gray-800">Lịch làm việc</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><FiChevronLeft /></button>
                        <span className="font-semibold text-gray-700">Tuần này</span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><FiChevronRight /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-6">
                        {days.map((d, i) => (
                            <button
                                key={d}
                                onClick={() => setSelectedDay(i)}
                                className={`py-2 rounded-xl text-sm font-medium transition-colors ${selectedDay === i ? 'bg-teal-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>

                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><FiClock className="text-teal-500" /> Khung giờ – {days[selectedDay]}</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(slot => (
                            <button
                                key={slot}
                                onClick={() => toggleSlot(slot)}
                                className={`py-2 px-3 rounded-xl text-sm font-medium border transition-colors ${selectedSlots.includes(slot) ? 'bg-teal-500 text-white border-teal-500' : 'border-gray-200 text-gray-600 hover:border-teal-300'}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="w-full py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors">
                    Lưu lịch làm việc
                </button>
            </div>
        </div>
    );
};

export default ExpertSchedulePage;
