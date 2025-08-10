const colors = {
  green: {
    iconBg: "bg-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-700",
    borderColor: "border-green-300",
  },
  blue: {
    iconBg: "bg-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
};

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  color = "green",
}) {
  const { iconBg, iconColor, titleColor, borderColor } = colors[color] || colors.green;

  return (
    <div
  className={`
    border-2 ${borderColor}
    aspect-square
    w-full max-w-xs   /* deixa o card com largura 100% do container, até um máximo */
    bg-white shadow rounded-2xl
    flex flex-col items-center justify-center
    p-6 space-y-3
  `}
    >
      <div
        className={`
          ${iconBg}
          flex items-center justify-center
          w-16 h-16 rounded-full
        `}
      >
        <Icon className={`w-8 h-8 ${iconColor}`} aria-hidden="true" />
      </div>

      <h3 className={`text-2xl font-semibold ${titleColor} text-center`}>
        {title}
      </h3>

      <p className="text-gray-500 text-center">{description}</p>
    </div>
  );
}
