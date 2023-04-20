import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import appReducer from "./appReducer";
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import musicReducer from "./musicReducer";

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: 'curSongId'
}

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer)
})

export default rootReducer
