import React, { useState } from 'react';
import { View, Text, Button, Card, Colors } from 'react-native-ui-lib';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { color_lightBlue } from '../../../../../Global/Global';

const HolidayCalendar = () => {
    const [selectedHolidays, setSelectedHolidays] = useState<any>({});
    const [holidays, setHolidays] = useState<string[]>([]);

    const onDayPress = (day: any) => {
        const date = day.dateString;
        if (!selectedHolidays[date]) {
            setSelectedHolidays({ ...selectedHolidays, [date]: { selected: true, selectedColor: Colors.blue30 } });
            setHolidays([...holidays, date]);
        } else {
            const { [date]: _, ...rest } = selectedHolidays;
            setSelectedHolidays(rest);
            setHolidays(holidays.filter(h => h !== date));
        }
    };

    const handleSave = () => {
        console.log("Saved Holidays:", holidays);
        // Implement save functionality here
    };

    const handleCancel = () => {
        setSelectedHolidays({});
        setHolidays([]);
    };

    return (
        <View style={{ backgroundColor: color_lightBlue, flex: 1 }}>
            <View padding-20 style={{ backgroundColor: "white", flex: 1 }}>
                <Text text40 marginB-20>
                    Select Holidays
                </Text>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={selectedHolidays}
                    theme={{
                        selectedDayBackgroundColor: Colors.blue30,
                        todayTextColor: Colors.yellow20,
                        arrowColor: Colors.blue30,
                    }}
                />

                <View marginT-20>
                    <Text text60 marginB-10>
                        Selected Holidays:
                    </Text>
                    {holidays.length > 0 ? (
                        holidays.map((holiday, index) => (
                            <Text key={index} text70>
                                {holiday}
                            </Text>
                        ))
                    ) : (
                        <Text text70>No holidays selected</Text>
                    )}
                </View>

                <View marginT-20 row spread>
                    <Button label="Cancel" onPress={handleCancel} backgroundColor={Colors.red30} />
                    <Button label="Save" onPress={handleSave} backgroundColor={Colors.green30} />
                </View>
            </View>
        </View>
    );
};

export default HolidayCalendar;
