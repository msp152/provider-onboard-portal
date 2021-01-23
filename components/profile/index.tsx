/**
 * Copyright 2020 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { useState, useEffect } from "react";

import {
  useSession,
  CombinedDataProvider,
  Image,
  LogoutButton,
  Text,
  Value,
} from "@inrupt/solid-ui-react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Container,
  Typography,
  TextField,
  FormGroup
} from "@material-ui/core";

import BusinessIcon from "@material-ui/icons/Business";
import Toolbar from '@material-ui/core/Toolbar';
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import AppBar from '@material-ui/core/AppBar';
import ContactTable from "../contactTable";
import { LoginButton } from "@inrupt/solid-ui-react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: "wrap",
    flexGrow: 1,
    maxWidth: "100%",
    position: "relative"
  },
  content: {
    flex: '1 0 auto'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  editIcon: {
    height: 38,
    width: 38
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    borderRadius: "8px",
    width: "100%",
    backgroundColor: "#E5E7E9"
  },
  card: {
    maxWidth: 480,
    marginBottom: 16,
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    backgroundClip: "#F8F9F9"
  },
  logoItem: {
    height: "7rem"

  },
  logout: {

    top: "3.5rem !important",
    // border: "1px #75758836 solid",
    marginLeft: "75rem"
  },
  title: {
    fontSize: 14
  }
}));
export default function LoginForm(): React.ReactElement {
  const classes = useStyles();
  const [idp, setIdp] = useState("https://manishpatel.solidcommunity.net/");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  const { session } = useSession();
  const { webId } = session.info;
  const [editing, setEditing] = useState(false);

  return (
    <div >
      <AppBar position="static" elevation={0} style={{ backgroundColor: "#EBF5FB" }}>
        <Toolbar>
          <img
            className={classes.logoItem}
            src="/uhc.jpeg"
            alt="opp-logo"
          />
        </Toolbar>

      </AppBar>

      <Container style={{ width: "50%", backgroundColor: "#F2F3F4" }}>
        <Container >
          <FormGroup>
            <TextField
              label="Profile WebId"
              placeholder="Profile WebId"
              type="url"
              value={idp}
              onChange={(e) => setIdp(e.target.value)}
              InputProps={{
                endAdornment: (
                  <LogoutButton>
                    <Button variant="contained" color="primary">
                      CLOSE
          </Button>
                  </LogoutButton>
                ),
              }}
            />
          </FormGroup>
        </Container>
        <br></br>
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
          <Card style={{ maxWidth: 480, }}>

            <CardActionArea
              style={{
                // justifyContent: "center",
                display: "flex",
              }}
            >
              <Image property={VCARD.hasPhoto.iri.value} width={150} />
            </CardActionArea>

            <CardContent style={{ marginLeft: "10rem" }}>
              <Typography gutterBottom variant="h5" component="h2">
                <Text property={FOAF.name.iri.value} edit={editing} autosave />
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <BusinessIcon/>

                <Text
                  property={VCARD.organization_name.iri.value}
                  edit={editing}
                  autosave
                />
              </Typography>

              <Typography
                gutterBottom
                variant="subtitle1"
                component="h3"
              >
                <AccountBoxIcon />
                <Text
                  property={
                    VCARD.role.iri.value
                  }
                  edit={editing}
                  autosave
                />
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                {"Born: "}
                <Value
                  property={VCARD.bday.iri.value}
                  dataType="datetime"
                  edit={editing}
                  autosave
                />
              </Typography>
            </CardContent>

            <CardContent>
              <Typography gutterBottom variant="h6" component="h3">
                Email Addresses
            </Typography>

              <ContactTable property={VCARD.hasEmail.value} edit={editing} />
            </CardContent>

            <CardContent>
              <Typography gutterBottom variant="h6" component="h3">
                Phone Numbers
            </Typography>

              <ContactTable property={VCARD.hasTelephone.value} edit={editing} />
            </CardContent>
          </Card>
        </CombinedDataProvider>
        <br></br>
      </Container>
    </div>
  );
}
