const InactiveBadge = () => {
  return (
    <div className="flex items-start mix-blend-multiply">
      <div className="flex pl-1.5 pr-2 py-0.5 justify-center items-center gap-1.5 rounded-2xl bg-[#DEDEDE]">
        <svg
          width="8"
          height="8"
        >
          <circle cx="4" cy="4" r="3" fill="#000000"/>
        </svg>
        <span className="text-[#000000] text-sm font-medium">Inactive</span>
      </div>
    </div>
  );
};

export default InactiveBadge;
