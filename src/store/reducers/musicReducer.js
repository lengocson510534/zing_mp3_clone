import actionTypes from "../actions/actionTypes";

const initState = {
    curSongId: null,
    curSongData: null,
    curAlbumId: null,
    isPlaying: false,
    songs: []
}

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.songId || null
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag
            }
        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs
            }
        case actionTypes.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null
            }
        case actionTypes.SET_CUR_ALBUM_ID:
            return {
                ...state,
                curAlbumId: action.albumId || null
            }
        default:
            return state
    }
}

export default musicReducer

