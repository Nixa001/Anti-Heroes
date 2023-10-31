# Anti-Heroes Database Project

Welcome to the Superhero Database project, where you can dive into the world of superheroes and villains! Our goal is to organize all the data about those smartypants in a user-friendly web application.

## Project Overview

As a supervillain, your dream is to get rid of those annoying, yoga-pant-wearing, weird masked superheroes. You've found confidential information about these superheroes and now it's time to build a web page to showcase it.

## Getting Started

To fetch the data about superheroes, we will use the `fetch` API in JavaScript. The data is available in a JSON format, which will be loaded into the application. Here's a snippet to get you started:

```javascript
// This function is called only after the data has been fetched and parsed.
const loadData = (heroes) => {
  console.log(heroes);
};

// Request the superhero data with fetch.
fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json()) // parse the response from JSON
  .then(loadData); // call the `loadData` function with the JSON value.
```

## Displaying Data

We will display the following superhero information in a table:

- Icon
- Name
- Full Name
- Powerstats
- Race
- Gender
- Height
- Weight
- Place Of Birth
- Alignment

The data will be paginated, with options to display 10, 20, 50, or 100 results per page. The default selected option is 20.

## Search and Sort

- **Search:** Users can search for superheroes by typing a string in the search bar. The results will be filtered dynamically after every keystroke.
- **Sort:** Users can sort the table by clicking on column headers. Initially, the rows are sorted by the column name in ascending order. Clicking again toggles between ascending and descending order. Missing values are always sorted last.

## Bonus Features

To enhance the project, consider adding these bonus features:

- **Custom Search Operators:** Include, exclude, fuzzy, equal, not equal, greater than, and lesser than for numbers (including weight and height).
- **Detail View:** Clicking on a hero from the list will show all the details and a large image.
- **Slick Design:** Improve the look and feel using CSS to create an engaging user interface.
- **Modify URL:** Update the URL with search terms and filters for easy sharing and navigation.

## Contributors

- **nixa001**
- **bcoulibal**
- **aniasse**
- **ialimoud**

Feel free to propose changes or submit issues if you encounter any problems. Let's make this Superhero Database project a success!
