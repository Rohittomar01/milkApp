// utils/dimensions.ts

import { Dimensions } from 'react-native';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive scaling functions
export const scaleWidth = (value: number) => (screenWidth / 375) * value; // Base width for scaling
export const scaleHeight = (value: number) => (screenHeight / 667) * value; // Base height for scaling
export const scaleFont = (value: number) => (screenWidth / 375) * value; // Base font size for scaling

// Margin and Padding scaling functions
export const scaleMargin = (value: number) => (screenWidth / 375) * value; // Base margin scaling
export const scalePadding = (value: number) => (screenWidth / 375) * value; // Base padding scaling
export const black_backgroundColor = "black"
export const color_white = "white"
export const color_green = "#38b000"
export const color_lightGreen = "#E3FCF7"
export const color_DarkGreen = "#00684A"
export const color_red = "#dc2f02"
export const color_gray = "#9E9E9E"
export const color_lightBlue = "#D1E9F6"

export const capitalizeEachWord = (text: string) => {
    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};
export const calculateDiscountPercentage = (originalPrice: number, discountAmount: number) => {
    if (originalPrice === 0) return 0;
    const discountedPrice = originalPrice - discountAmount;
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discountPercentage);
};
export const formatToIndianDate = (dateInput: Date) => {
    const date = new Date(dateInput);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};
