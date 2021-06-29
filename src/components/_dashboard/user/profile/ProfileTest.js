import PropTypes from 'prop-types';
import { Icon, InlineIcon } from '@iconify/react';
import heartIcon from '@iconify-icons/mdi/heart';
import accountSupervisor from '@iconify-icons/mdi/account-supervisor';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';

import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@material-ui/core';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object
};

export default function ProfileAbout({ profile }) {
  const { quote, country, email, role, company, school } = profile;

  return (
    <Card>
      <CardHeader title="자기소개" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">자기소개 하세요</Typography>

        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={heartIcon} />
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              <a href="/dashboard/app" style={{ textDecoration: 'none', color: 'black' }}>
                팔로워 7
              </a>
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={accountSupervisor} />
          <Typography variant="body2">
            <Link to="/dashboard/user/account" component="span" variant="subtitle2" color="text.primary">
              <a href="/dashboard/app" style={{ textDecoration: 'none', color: 'black' }}>
                팔로잉 10
              </a>
            </Link>
          </Typography>
        </Stack>

        {/* <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack> */}
      </Stack>
    </Card>
  );
}
