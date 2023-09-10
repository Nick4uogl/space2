import { useEffect, useState } from 'react';

import './resourceDetail.scss';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import { Link, NavLink, useParams } from 'react-router-dom';
import { Navigation, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as ArrowBack } from '../../assets/img/icons/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../assets/img/icons/arrowRight.svg';
import { ReactComponent as CloseIcon } from '../../assets/img/icons/close.svg';
import { ReactComponent as RequestSvg } from '../../assets/img/icons/request.svg';
import networkImg from '../../assets/img/network2.png';
import resourceImg from '../../assets/img/resource.png';
import Header from '../../components/Header/Header';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import StyledAlert from '../../components/StyledAlert/StyledAlert';
import { useGetResourceQuery } from '../../redux/resources/resourcesApiSlice';
import NotFound from '../NotFound/NotFound';

function ResourceDetail() {
  const params = useParams();
  const [isToggled, setIsToggled] = useState(false);

  //api
  const getResourceResponse = useGetResourceQuery(params?.id);
  const resource = getResourceResponse?.data;

  console.log(getResourceResponse);

  const handleIsToggled = () => {
    setIsToggled(!isToggled);
  };

  if (!resource && !getResourceResponse.isLoading) {
    return <NotFound message="Sorry, we can`t find this resource" />;
  }

  return (
    <div className="resource-detail">
      {/* <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <StyledAlert
          onClose={handleAlertClose}
          severity={'error'}
          icon={false}
          action={
            <button onClick={handleAlertClose} className={`alert-action-close`}>
              <CloseIcon fill="#fff" width="0.7rem" height="0.7rem" />
            </button>
          }
          sx={{
            backgroundColor: '#F34A4A',
          }}
        >
          Failed to fetch resource
        </StyledAlert>
      </Snackbar> */}
      <Header />
      <div className="resource-detail__container">
        {getResourceResponse.isLoading ? (
          <CircularProgress
            size={55}
            sx={{
              color: '#51CE7B',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: '-22.5px',
            }}
          />
        ) : (
          <div className="resource-detail__main main-resource">
            <div className="main-resource__navigation navigatoin-resource flex-space">
              <div className="navigatoin-resource__location">
                <p className="navigatoin-resource__location-previous">
                  Resources
                </p>
                <span>{'>'}</span>
                <p className="navigatoin-resource__location-current">
                  {resource?.source_name}
                </p>
              </div>
              <Link
                to={'/resources '}
                className="flex-align-center  navigatoin-resource__back-link"
              >
                <ArrowBack /> Back to resources
              </Link>
            </div>
            <div className="main-resource__top flex-space">
              <article className="card-resource">
                <div className="card-resource__img">
                  <img
                    src={`data:image/png;base64, ${resource?.image}`}
                    alt={`${resource?.source_name}`}
                  />
                </div>

                <div className="card-resource__right">
                  <h2 className="card-resource__title">
                    {resource?.source_name}
                  </h2>
                  <p className="card-resource__text">{resource?.description}</p>
                  <div className="card-resource__bottom">
                    {!resource?.is_public &&
                      resource?.is_currently_available && (
                        <Link
                          to={'/resource-detail/1'}
                          className="resource-resources__open-link resource-resources__open-link--subscribe"
                        >
                          Subscribe
                        </Link>
                      )}
                    {(resource?.is_public || resource?.stripe_product_id) && (
                      <Link
                        to={'/resource-detail/1'}
                        className="resource-resources__open-link resource-resources__open-link--open"
                      >
                        Open
                      </Link>
                    )}
                    <Link to={''} className="card-resource__demo">
                      Request Demo
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
              {resource?.is_public && (
                <div className="card-resource-upsell flex-space">
                  <div className="card-resource-upsell__container flex-align-center">
                    <img
                      src={`data:image/png;base64, ${resource?.premium_instance?.image}`}
                      alt={resource?.premium_instance?.source_name}
                    />
                    <div className="card-resource-upsell__info">
                      <h2 className="card-resource-upsell__title">
                        {resource?.premium_instance?.source_name}
                      </h2>
                      <p className="card-resource-upsell__text">
                        {resource?.premium_instance?.description}
                      </p>
                    </div>
                  </div>
                  <div className="card-resource-upsell__right flex-align-center">
                    <p className="card-resource-upsell__price">
                      from £45 / p.m
                    </p>
                    <Link to={''} className="card-resource-upsell__learn-more">
                      Learn More
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="main-resource__description description-resource">
              <h2 className="description-resource__title">Short Desciprion:</h2>
              <p className="description-resource__text">
                {resource?.description} <br />
                <br />
                Through interactive knowledge graphs, researchers can delve into
                the complex genetic interplay of these plants, accelerating
                discoveries and the potential improvement of these crucial food
                sources.
              </p>
              <ul className="description-resource__values">
                <li>Size: 2,116,707</li>
                <li>Nodes: 9,343,916 edges</li>
              </ul>
            </div>
            <div className="main-resource__info info-resource">
              <div className="table-resource__container">
                <table className="main-resource__table table-resource">
                  <thead>
                    <tr>
                      <th>Species</th>
                      <th>Taxid</th>
                      <th>Assembly</th>
                      <th>Gene count</th>
                      <th>Gene names %</th>
                      <th>Publication</th>
                      <th>NER</th>
                      <th>TM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-resource__colored">
                      <td>Wheat</td>
                      <td>4565</td>
                      <td>IWGSC 1.2 / 2.1</td>
                      <td>120744</td>
                      <td>93.5</td>
                      <td>31095</td>
                      <td>382297</td>
                      <td>9031</td>
                    </tr>
                    <tr className="table-resource__colored">
                      <td>Wheat</td>
                      <td>4565</td>
                      <td>IWGSC 1.2 / 2.1</td>
                      <td>120744</td>
                      <td>93.5</td>
                      <td>31095</td>
                      <td>382297</td>
                      <td>9031</td>
                    </tr>
                    <tr className="table-resource__colored">
                      <td>Wheat</td>
                      <td>4565</td>
                      <td>IWGSC 1.2 / 2.1</td>
                      <td>120744</td>
                      <td>93.5</td>
                      <td>31095</td>
                      <td>382297</td>
                      <td>9031</td>
                    </tr>
                    <tr>
                      <td>Wheat</td>
                      <td>4565</td>
                      <td>IWGSC 1.2 / 2.1</td>
                      <td>120744</td>
                      <td>93.5</td>
                      <td>31095</td>
                      <td>382297</td>
                      <td>9031</td>
                    </tr>
                    <tr>
                      <td>Wheat</td>
                      <td>4565</td>
                      <td>IWGSC 1.2 / 2.1</td>
                      <td>120744</td>
                      <td>93.5</td>
                      <td>31095</td>
                      <td>382297</td>
                      <td>9031</td>
                    </tr>
                    <tr>
                      <td>Wheat</td>
                      <td>4565</td>
                      <td>IWGSC 1.2 / 2.1</td>
                      <td>120744</td>
                      <td>93.5</td>
                      <td>31095</td>
                      <td>382297</td>
                      <td>9031</td>
                    </tr>
                    <tr>
                      <td>Wheat</td>
                      <td>4565</td>
                      <td>IWGSC 1.2 / 2.1</td>
                      <td>120744</td>
                      <td>93.5</td>
                      <td>31095</td>
                      <td>382297</td>
                      <td>9031</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="info-resource__bottom flex-space">
                <div className="info-resource__compare flex-align-center">
                  {resource?.is_public && (
                    <>
                      Compare Resources
                      <label className="info-resource__switch">
                        <input
                          type="checkbox"
                          checked={isToggled}
                          onChange={handleIsToggled}
                        />
                        <span className="switch" />
                      </label>
                    </>
                  )}
                </div>
                <div className="info-resource__premium-color flex-align-center">
                  <span></span> Available with Premium
                </div>
              </div>
            </div>
            <div className="examples-resource">
              <h2>Network Examples</h2>
              <div className="examples-resource__container">
                <Swiper
                  modules={[Navigation, Zoom]}
                  zoom={{
                    maxRatio: 3,
                    minRatio: 1,
                  }}
                  navigation={true}
                  slidesPerView={1}
                  grabCursor={true}
                  className="examples-resource__slider"
                >
                  <SwiperSlide>
                    <div className="swiper-zoom-container">
                      <img src={networkImg} alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-zoom-container">
                      <img src={networkImg} alt="" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourceDetail;
