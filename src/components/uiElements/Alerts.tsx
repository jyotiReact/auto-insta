import { CSSProperties, ReactNode } from 'react';

interface AlertsProps {
  alertStyling?: CSSProperties;
  iconStyling?: CSSProperties;
  icon?: ReactNode;
  headerStyling?: CSSProperties;
}

function Alerts({ alertStyling, iconStyling, icon, headerStyling }: AlertsProps) {
  return (
    <div
      className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9"
      style={{ ...alertStyling }}
    >
      <div
        className="mr-5 flex h-9 w-9 items-center justify-center bg-warning rounded-lg bg-opacity-30"
        style={{ ...iconStyling }}
      >
        {icon}
      </div>
      <div className="w-full">
        <h5 className="mb-3 text-lg font-semibold text-[#9D5425]" style={{ ...headerStyling }}>
          Attention needed
        </h5>
        <p className="leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when
        </p>
      </div>
    </div>
  );
}

export default Alerts;
