import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    seasonTheme: {},
    chill: {},
    artistFavorite: {},
    artistTrending: {},
    top100: {},
    albumhot: {},
    newRelease: {},
    weekChart: [],
    chart: {},
    rank: []
}


const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                artistFavorite: action.homeData?.find(item => item.sectionId === 'hEditorTheme2') || {},
                artistTrending: action.homeData?.find(item => item.sectionId === 'hArtistTheme') || {},
                top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                albumhot: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
                seasonTheme: action.homeData?.find(item => item.sectionId === 'hSeasonTheme') || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
                chart: action.homeData?.find(item => item.sectionId === 'hZC')?.chart || {},
                rank: action.homeData?.find(item => item.sectionId === 'hZC')?.items || [],
            }
        default:
            return state
    }
}

export default appReducer

