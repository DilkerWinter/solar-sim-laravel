export default function BenefitItem({ Icon, bgColor, iconColor, title, description }) {
  return (
    <div className="flex items-start space-x-4">
      <div className={`${bgColor} p-2 rounded-full`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
