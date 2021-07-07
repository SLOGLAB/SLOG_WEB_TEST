import { filter, orderBy } from 'lodash';

import { sentenceCase } from 'change-case';
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@material-ui/core/styles';

import {
  IconButton,
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Core,
  Card,
  Table,
  Avatar,
  Checkbox,
  Tabs,
  Tab,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TextField
} from '@material-ui/core';
import { Delete, Cached, Today, Info } from '@material-ui/icons';

import DatePicker from '@material-ui/lab/DatePicker';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

import Page from '../../components/Page';

import { useDispatch, useSelector } from '../../redux/store';
import { getUserList, deleteUser } from '../../redux/slices/user';
import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { AnalyticsConversionRates } from '../../components/_dashboard/general-analytics';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user/list';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../components/_dashboard/blog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
/// tabs

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function MyGroup() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBBy, setOrderBBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /// tabs

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ///

  /// DatePicker
  const [timeValue, setTimeValue] = React.useState(new Date());

  ///
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  // blogpost

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
    <Page title="General: Analytics | Minimal-UI">
      {/* <Container maxWidth="xl"></Container> */}
      <Container>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3} style={{ marginBottom: '40px' }}>
          {sortedPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12} style={{ marginBottom: '10px' }}>
            {' '}
            <div style={{ display: 'flex' }}>
              {' '}
              <Box sx={{ width: '60%' }}>
                <DesktopDatePicker
                  label="DatePicker"
                  value={timeValue}
                  minDate={new Date('2017-01-01')}
                  onChange={(newValue) => {
                    setTimeValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <div style={{ marginLeft: 'auto' }}>
                <IconButton aria-label="Cached" color="primary">
                  <Cached />
                </IconButton>
                <IconButton aria-label="Today" color="primary">
                  <Today />
                </IconButton>
                <IconButton aria-label="Info" color="primary">
                  <Info />
                </IconButton>
                <IconButton aria-label="delete" color="primary">
                  <Delete />
                </IconButton>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={12} lg={12} style={{ marginBottom: '10px' }}>
            <Card>
              {' '}
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    {' '}
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="오늘" {...a11yProps(0)} />
                      <Tab label="이번주" {...a11yProps(1)} />
                      <Tab label="이번달" {...a11yProps(2)} />
                    </Tabs>
                  </div>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12} style={{ marginBottom: '10px' }}>
            <AnalyticsConversionRates />
          </Grid>
        </Grid>
        {/* <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.newUser}
              startIcon={<Icon icon={plusFill} />}
            >
              New User
            </Button>
          }
        /> */}
        <Grid item xs={12} md={6} lg={12}>
          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={userList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, name, role, status, company, avatarUrl, isVerified } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={(status === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu onDelete={() => handleDeleteUser(id)} userName={name} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={userList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Grid>
      </Container>
    </Page>
  );
}
