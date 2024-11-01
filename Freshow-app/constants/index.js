const COLORS = {
    primary: "#CDEEFF", // 주요 테마 색상
    secondary: "#FFA07A", // 강조 색상 (오렌지 계열)
    accent: "#FF6347", // 레시피 하이라이트 (레드 계열)
    lightWhite: "#f0f8ff", // 화면 배경색 (밝은 하늘색)
    gray: "#888888", // 회색 텍스트 색상
    darkGray: "#333333", // 짙은 회색 텍스트 색상
    lightBlue: "#ADD8E6", // 버튼 등 일부 요소의 밝은 파란색
    white: "#FFFFFF",
    black: "#000000",
};

const FONT = {
    regular: "System", // 기본 폰트 (필요시 맞춤 폰트를 지정하세요)
    bold: "System-Bold",
    medium: "System-Medium",
};

const SIZES = {
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
    radius: 10, // 버튼 및 카드의 둥근 모서리
    padding: 20,
};

const SHADOW = {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // 안드로이드 그림자
};

export { COLORS, FONT, SIZES, SHADOW };
