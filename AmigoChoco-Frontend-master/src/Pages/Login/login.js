
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api'
import { useHistory, Link } from 'react-router-dom';
import TesteSpinner from '../../Components/TesteSpinner'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.chocolatesbrasilcacau.com.br/assets/site/img/home/sc1_effect.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();
    console.log(login);
    console.log(senha);

    const data = {
      login,
      senha
    };
    try {
      setCarregando(true);
      const response = await api.get(`/login/${data.login}/${data.senha}`);
      setCarregando(false);
      console.log(response);
      localStorage.setItem('pLogin', data.login);
      history.push('/principal');
    }
    catch (err) {
      alert('Erro ao tentar logar no sistema');
    }

  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <img width="270"src='../fundo.png'/>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <TextField
                placeholder="Email"
                value={login}
                onChange={e => setLogin(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Senha"
                label="Senha"
                id="Senha"
                autoComplete="current-password"
              />
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre-se de mim"
            />
            <Link to="/main">
              <Button

                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}

              >
                {carregando ? <TesteSpinner /> : "Entrar"}
              </Button> </Link>
            <Grid container>
              <Grid item xs>
                <Link to="/main">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link to="cadastro">
                  {"Não tem conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );

}