import { useSelector } from 'react-redux';

import Networks from './Networks';
import { useGetNetworksQuery } from '../../redux/networks/networksApiSlice';
import { selectNetworks } from '../../redux/networks/networksSlice';
import { selectUser } from '../../redux/user/userSlice';

function NetworksContainer() {
  const user = useSelector(selectUser);
  const networksResponse = useGetNetworksQuery();
  const data = useSelector(selectNetworks);
  const networks = data?.filter((network) => network?.owner?.id === user?.id);
  return <Networks networksResponse={networksResponse} networks={networks} />;
}

export default NetworksContainer;
