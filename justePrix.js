var randomValue = Math.round(Math.random() * 10)
var propositionPrix = window.prompt('Quelle est le chiffre aléatoire ?')
propositionPrix = parseInt(propositionPrix, 10)

while (propositionPrix != randomValue) {

    if (propositionPrix > randomValue) {
        window.alert('C\'est moins')
    } 
    else {
        window.alert('C\'est plus')
    }
    var propositionPrix = window.prompt('Retentez votre chance')

}
window.alert('YOUHOU T\'ES TROP FORT')
