import { AppProps } from 'next/app'
import {Provider, useDispatch, useStore} from "react-redux";

import store from '../store/store';


export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {


    return (
        <Provider store={store} >
            <Component {...pageProps} />
        </Provider>
        );
}
