import Networks from './Networks';
import { useGetFromRecycleBinQuery } from '../../redux/networks/networksApiSlice';
import './recycleBin.scss';

const RecycleBin = () => {
  const networksResponse = useGetFromRecycleBinQuery();
  return (
    <Networks
      networksResponse={networksResponse}
      networks={networksResponse?.data}
      recycleBin={true}
    />
  );
};

export default RecycleBin;
