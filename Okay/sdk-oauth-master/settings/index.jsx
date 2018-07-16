function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Fitbit Account</Text>}>
        <Oauth
          settingsKey="oauth"
          title="Login"
          label="Fitbit"
          status="Login"
          authorizeUrl="https://www.fitbit.com/oauth2/authorize"
          requestTokenUrl="https://api.fitbit.com/oauth2/token"
          clientId="22D47H"
          clientSecret="ea6838fda2f90025c0cb071ab3a8c160"
          scope="sleep"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
