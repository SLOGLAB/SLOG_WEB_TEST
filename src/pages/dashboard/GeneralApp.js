// material
import { Container, Grid, Stack, Button, Fab } from '@material-ui/core';
import { Add, Refresh, Settings } from '@material-ui/icons';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import {
  AppWelcome,
  AppWidgets1,
  AppWidgets2,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppTotalDownloads,
  AppTotalInstalled,
  AppCurrentDownload,
  AppTotalActiveUsers,
  AppTopInstalledCountries
} from '../../components/_dashboard/general-app';
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  return (
    <Page title="General: App | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <div style={{ flexDirection: 'column', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
              {' '}
              <Refresh />
              <Settings style={{ marginLeft: '10px', marginRight: '10px' }} />
              <Stack spacing={2} direction="row">
                <Button size="midium" variant="contained">
                  과목이다
                </Button>
              </Stack>{' '}
            </div>
            <div>
              <Stack spacing={2} direction="row">
                <Fab size="small" aria-label="add">
                  <Add />
                </Fab>
                <Button size="medium" variant="contained">
                  TO DO
                </Button>
                <Button size="medium" variant="contained">
                  개별 복사
                </Button>
                <Button size="medium" variant="contained">
                  일정 복사
                </Button>
              </Stack>
            </div>
          </div>

          {/* 
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user.displayName} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalActiveUsers />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalInstalled />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalDownloads />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid>  */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AppWidgets1 />
              </Grid>
              <Grid item xs={12}>
                <AppWidgets2 />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
