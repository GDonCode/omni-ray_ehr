interface PageTitleProps {
  title: string;
  subtitle: string;
  titleFont: string;
  bodyFont: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export default function PageTitle({
  title,
  subtitle,
  titleFont,
  bodyFont,
  bgColor = "#058080",
  textColor = "white",
  className = "",
}: PageTitleProps) {
  return (
    <div
      className={`py-4 w-full lg:mt-36 mt-29 relative ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <h1 className={`${titleFont} text-3xl lg:text-4xl text-center`} style={{ color: textColor }}>
        {title}
      </h1>
      <p
        className={`${bodyFont} text-center mt-2 text-sm lg:text-base`}
        style={{ color: textColor, opacity: 0.9 }}
      >
        {subtitle}
      </p>
    </div>
  );
}