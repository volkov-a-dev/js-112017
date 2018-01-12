const positionClick = function (e) {
    let top = e.get('domEvent').originalEvent.pageY,
        left = e.get('domEvent').originalEvent.pageX;

    return [top, left];
};

export default positionClick;