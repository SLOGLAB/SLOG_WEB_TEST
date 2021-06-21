import { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { orderBy } from 'lodash';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  FormGroup,
  Container,
  FormControlLabel,
  Checkbox,
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  TextField,
  Fab,
  Autocomplete,
  Button,
  Skeleton,
  Stack
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Page from '../../components/Page';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// aa
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../components/_dashboard/blog';

// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
//
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const options = ['전체', 'Option2'];
const options1 = ['최신순', 'Option211'];

// ----------------------------------------------------------------------

// post
const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

GroupSearch.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function GroupSearch() {
  // const { cover, title, view, comment, share, author, createdAt } = post;
  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase('hi')}`;
  const latestPostLarge = 0;
  const latestPost = 2;

  // const POST_INFO = [
  //   { number: comment, icon: messageCircleFill },
  //   { number: view, icon: eyeFill },
  //   { number: share, icon: shareFill }
  // ];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  const [value1, setValue1] = useState(options1[0]);
  const [inputValue1, setInputValue1] = useState('');

  // blogpost

  const dispatch = useDispatch();
  const [filters, setFilters] = useState('latest');
  const { posts, hasMore, index, step } = useSelector((state) => state.blog);
  const sortedPosts = applySort(posts, filters);
  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);

  useEffect(() => {
    dispatch(getPostsInitial(index, step));
  }, [dispatch, index, step]);

  const handleChangeSort = (event) => {
    setFilters(event.target.value);
  };

  return (
    <Page>
      <Grid item xs={12} md={6} lg={4}>
        <h1>그룹검색</h1>
      </Grid>
      <div style={{ display: 'flex' }}>
        {' '}
        <Grid item xs={12} md={6} lg={4}>
          <div style={{ display: 'flex' }}>
            {' '}
            <Autocomplete
              style={{ marginTop: '30px', marginBottom: '30px', marginRight: '20px' }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Controllable" />}
            />
            <Autocomplete
              style={{ marginTop: '30px', marginBottom: '30px' }}
              value={value1}
              onChange={(event, newValue) => {
                setValue1(newValue);
              }}
              inputValue={inputValue1}
              onInputChange={(event, newInputValue) => {
                setInputValue1(newInputValue);
              }}
              id="controllable-states-demo"
              options={options1}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Controllable" />}
            />{' '}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div style={{ display: 'flex', marginTop: '30px', marginLeft: '50px' }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="공개" />
              {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="빈방" />
              {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
            </FormGroup>
          </div>
        </Grid>
        <div style={{ marginTop: '30px', marginLeft: 'auto' }}>
          <Fab size="small" color="secondary" aria-label="add">
            <Add />
          </Fab>
        </div>
      </div>

      <InfiniteScroll
        next={onScroll}
        hasMore={hasMore}
        loader={SkeletonLoad}
        dataLength={posts.length}
        style={{ overflow: 'inherit' }}
      >
        <Grid container spacing={3}>
          {sortedPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </InfiniteScroll>
    </Page>
  );
}
