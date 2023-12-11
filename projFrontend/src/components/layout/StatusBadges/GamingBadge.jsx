const GamingBadge = () => {
  return (
    <div className="flex items-start mix-blend-multiply">
      <div className="flex pl-1.5 pr-2 py-0.5 justify-center items-center gap-1.5 rounded-2xl bg-[#E9C4C4]">
        <svg
          width="8"
          height="8"
        >
          <circle cx="4" cy="4" r="3" fill="#B71230" fillOpacity="0.64" />
        </svg>
        <span className="text-[#B71230] text-sm font-medium">Gaming</span>
      </div>
    </div>
  );
};

export default GamingBadge;
