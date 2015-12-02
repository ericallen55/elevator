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

//Starting function randomly creates requests
var elevatorRequestEvent = function () {
    //create random number between 1 and floors +1 for currentFloor and requestedFloor
    //This could be fired by button or timer
    //this.sendElevator(currentFloor, requestedFloor);
}

var sortArray = function (array, direction) {
    //sort the array by direction
}

//Decides what elevator to send
var sendElevator = function (currentFloor, requestedFloor) {
    var direction = currentFloor > requestedFloor ? 'Down' : 'Up';
    var unoccupiedElevator = null;
    var distanceToClosestUnoccupiedElevator = null;
    elevatorArray.forEach(function (elevator) {
        if(!elevator.maintenanceMode) {
            if(elevator.unoccupied && elevator.numberOfTrips > 99){
                elevator.maintenanceMode = true;
            }
            //Unoccupied elevator at your floor
            else if (elevator.unoccupied && elevator.currentFloor === currentFloor) {
                elevator.direction = direction;
                elevator.unoccupied = false;
                elevator.stopRequests.push(requestedFloor);
                elevator.numberOfTrips++;
                this.doorOpen(elevator);

                return;
            }
            //Occupied elevator moving in the right direction and coming to your floor this isn't taking into account
            //the closest elevator
            else if (elevator.direction === direction &&
                ((elevator.direction === 'Down' && elevator.currentFloor >= currentFloor) ||
                (elevator.direction === 'Up' && elevator.currentFloor <= currentFloor))) {

                elevator.stopRequests.push(requestedFloor);
                this.sortArray(elevator.stopRequests, elevator.direction);
                this.doorOpen(elevator);
                return;
            }
            //Unoccupied elevator not on your floor find closest.
            else {
                var currentDistance = Math.abs(elevator.currentFloor - currentFloor);
                if (!distanceToClosestUnoccupiedElevator || currentDistance < distanceToClosestUnoccupiedElevator) {
                    unoccupiedElevator = elevator;
                    distanceToClosestUnoccupiedElevator = currentDistance;
                }
            }
        }
    })

    unoccupiedElevator.direction = direction;
    unoccupiedElevator.unoccupied = false;
    unoccupiedElevator.stopRequests.push(requestedFloor);
    unoccupiedElevator.numberOfTrips++;
    this.doorOpen(unoccupiedElevator);
};

var doorOpen = function (elevator) {
    console.log('doorOpen ' + elevator.id);
    //wait for door close signal from elevator hardware
    doorClosedSignal().then(function (){
        console.log('doorClosed ' + elevator.id);
    });
}


//catches the reached floor event fired by elevator hardware
var reachedFloor = function (floorReached, elevator) {
    console.log('Reached floor ' + floorReached + 'by elevator number ' + elevator.id);
    elevator.numberOfFloorsPassed++;
}



