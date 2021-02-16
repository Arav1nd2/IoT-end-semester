async function bulb1Runner({pH , temp}) {
        if(pH > 6 && temp < 40) {
        return 1;
    } else {
        return 0;
    }
}


module.exports = bulb1Runner