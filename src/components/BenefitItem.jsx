function BenefitItem({ icon, title }) {
  return (
    <div className="flex flex-col items-center text-center w-36">
      <div className="text-3xl text-buriti-red mb-2">{icon}</div>
      <p className="text-sm font-montserrat text-gray-700">{title}</p>
    </div>
  );
}

export default BenefitItem;
