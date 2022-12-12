# Process Scheduling Algorithms

This project was developed with Typescript, React and Material UI v5. 

<br/>

Process scheduling algorithms for finding average wait time and displaying Vizulization of the result - First Come First Serve, Shortest Job First, Round Robin and Two Way First Come First Serve. 

Initially part of my University's Operating System course homeworks to understand how an operating system works inside. I decided to take it further and make a web application for the material. I hope you enjoy :)


## Live application

Open [https://kaarelkaarelson.github.io](https://kaarelkaarelson.github.io) to see the application live in browser (the application is in Estonian).

## Instructions

1. Select `Protsessihaldus` from left drop-down menu.
2. Pick a array of processes and click on one of the 4 algorithms.
    1. Or enter your own process array according to the following rules:
        1. Every process consists of two values - a start time and an end time, that are separated by comma `,`
        2. Processes themselves are separated by semicolon `;`
        3. In the end, the processes are in the following format `{number},{number};{number},{number}...` e.g. `1,4;3,7...`
        
        Constraints :exclamation: 
        ```diff
        ! Processes's must be in ascending order in respect to start times. 
        ! Maximum 1 process can come in in given moment.
        ```
        
 <br/>
 
 :point_down: The unit of time is seconds. 
 
 :point_down: Empty blocks in Visulizer means that no process is being served at that time.

## Project 

To run the project, navigate to project directory and run

### `npm install` or `yarn install`

After installing dependencies, run:

### `npm start` or `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view the application in browser.

Optionally, you can run the jest test for algorithms.

### `npm test` or `yarn test`
