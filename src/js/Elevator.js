var elevatorArray = [];
var floors = 10;
var numberOfElevators = 10;

var elevatorObj = {
    direction: null,
    unoccupied: true,
    stopRequests: [],
    currentFloor: 1,
    numberOfTrips:  0,
    numberOfFloorsPassed: 0,
    maintenanceMode: false,
    id: null
};

var primeElevatorArray = function () {
    for(var i = 0; i < numberOfElevators; i++){
        var newElevator = elevatorObj.constructor();
        newElevator.id = i;
        elevatorArray.push(newElevator);
    }
}();

