const imageMap = {
    Default: {
        merlin: require('../resource/cool/merlin.jpg'),
        percival: require('../resource/cool/percival.jpg'),
        servant: require('../resource/cool/servant.jpg'),
        assassin: require('../resource/cool/assassin.jpg'),
        mordred: require('../resource/cool/mordred.jpg'),
        morgana: require('../resource/cool/morgana.jpg'),
        minion: require('../resource/cool/minion.jpg'),
        oberon: require('../resource/cool/oberon.jpg')
    },
    Politics: {
        merlin: require('../resource/politics/merlin.jpg'),
        percival: require('../resource/politics/percival.jpg'),
        servant: require('../resource/politics/servant.jpg'),
        assassin: require('../resource/politics/assassin.jpg'),
        mordred: require('../resource/politics/mordred.jpg'),
        morgana: require('../resource/politics/morgana.jpg'),
        minion: require('../resource/politics/minion.jpg'),
        oberon: require('../resource/politics/oberon.jpg')
    }
}

export const getImage = (theme='Default', role) => {
    return imageMap[theme][role];
}