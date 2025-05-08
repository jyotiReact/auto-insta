import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/custom/Charts/ChartOne';
import ChartThree from '../../components/custom/Charts/ChartThree';
import ChartTwo from '../../components/custom/Charts/ChartTwo';
import ChatCard from '../../components/custom/Chat/ChatCard';
import MapOne from '../../components/custom/Maps/MapOne';
import TableOne from '../../components/custom/Tables/TableOne';
import TableTwo from '../../components/custom/Tables/TableTwo';
import Header from '../../components/custom/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faEye,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { getApi } from '../../services/commonServices';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statsData, setStatsData] = useState([]);
  useEffect(() => {
    async function fetchStatsData() {
      try {
        const data = await getApi('user/get-statistics');
        console.log(data, '===');
        setStatsData(data.data)
      } catch (error) {
        console.error('Error fetching automations:', error);
      }
    }
    fetchStatsData();
  }, []);
  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 p-4">
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <FontAwesomeIcon icon={faEye} className="text-xl text-white" />
        </CardDataStats>
        <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-xl text-white"
          />
        </CardDataStats>
        <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-xl text-white"
          />
        </CardDataStats>
      </div>

      <div className="mt-4 p-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
          <TableTwo />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default Dashboard;
