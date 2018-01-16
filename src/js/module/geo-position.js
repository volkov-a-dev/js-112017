const geoPosition = {
    positionNavigation() {
        let options = {
            enableHighAccuracy: true, // Boolean сообщает приложению, что нужно получить максимально уточненный результат.
            timeout: 5000, // Положительное число в милисекундах, устанавливающее время, за которое устройство должно вернуть результат
            maximumAge: 0 // Положительное число указывающее максимально возможное время для кэширования результатов поиска положения устройства.
        };

        let success = pos => {
            let crd = pos.coords;
            // console.log('Your current position is:');
            // console.log(`Latitude : ${crd.latitude}`);
            // console.log(`Longitude: ${crd.longitude}`);
            // console.log(`More or less ${crd.accuracy} meters.`);
            return crd
        };
        //
        let error = err => {
            // console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        return  navigator.geolocation.getCurrentPosition(success, error, options);
    }
}

export default geoPosition.positionNavigation;