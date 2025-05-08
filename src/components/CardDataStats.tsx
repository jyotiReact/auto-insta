import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-lg border border-pink-200 bg-white py-6 px-7.5 shadow-lg transition-all duration-300 hover:bg-pink-50 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-400">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-2xl font-extrabold text-gray-900">{total}</h4>
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>

        {/* <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp ? 'text-pink-600' : levelDown ? 'text-purple-600' : ''
          }`}
        >
          {rate}
          {levelUp && (
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-pink-600"
              style={{ width: 10, height: 11 }}
            />
          )}
          {levelDown && (
            <FontAwesomeIcon
              icon={faArrowDown}
              className="text-purple-600"
              style={{ width: 10, height: 11 }}
            />
          )}
        </span> */}
      </div>
    </div>
  );
};

export default CardDataStats;