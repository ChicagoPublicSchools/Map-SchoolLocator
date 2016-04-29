CPS School Locator
======
The CPS School Locator is a tool used to search for and compare schools in the Chicago Public School system.[View the live map](http://cps.edu/map)



>The CPS School Locator allows you to search for your neighborhood school, search for schools within a radius of an address, search for schools within a zip code, and search for schools close to your current location.

**How to use the CPS School Locator**
------
## Searches
There are four types of search results:

1. Address/Location
2. School
3. Radius
4. Zip Code

#### Address Search
**An Address Search results in your neighborhood school being shown.** If an address is typed into the search box the result lists the neighborhood schools (elementary, middle, and high) that your child can attend (without having to fill out an application). The map shows the geolocated address, the school locations, and the attendance boundary areas.

#### Location Search
**A Location Search results in your neighborhood school being shown.** If you press and hold on the map for 2 seconds or click the Find Schools Around Me button the display lists the neighborhood schools (elementary, middle, and high) that your child can attend (without having to fill out an application). The map shows the location of the long press (or the geolocated address of the Find Me feature), the school locations, and the attendance boundary areas.

#### School Search
**A School Search results in one school being displayed.** If a school name is typed and chosen from the drop-down the detail panel of that school is displayed. The map shows the school location and attendance boundary area.

#### Radius Search
**A Radius Search results in all the schools within a radius being displayed.** If you click the More Schools button the display lists all the schools within a 2 mile radius. The map shows the center of the radius and the school locations.

#### Zip Code Search
**A Zip Code Search results in all the schools within a zip code being displayed.** If a zip code is typed and chosen from the drop-down the display lists all of the schools located with that zip code. The map shows the school locations.

####URL Lookup
**Pass in the school ID in order to target one or more schools.** The URL should end with ?Schools=609720 or for multiple schools ?Schools=609720;609678. The ?ECP query will show all schools with an Early Childhood Program.


#
>To show all schools, click the Magnifying Glass when the input box is empty.

## Compare Schools
To compare metrics such as Number of Students, Rating, and Percentile Scores in Reading and Math click the box to the left of the school name in the display list. A panel at the bottom of the screen will show the checked schools.

>Click the down arrow on the panel to hide the Compare Schools Panel. Click the check box icon above the zoom buttons at the bottom left of the map to show the Compare Schools Panel.

## Filters
Filters can be applied to the results in order to narrow your search. You may have to click the "More Schools" button to get a list of schools within a radius. The results can be filtered by:

1. Grade Category
2. Performance Rating
3. School Classification
4. Programs Offered (more programs coming soon)

## Overlays
An overlay is a transparent layer of additional information that appears on top of the existing map to help denote specific boundaries or regions. For example, a zip code overlay will show boundaries for all the zip codes in Chicago. The CPS School Locator includes the following overlays:

**Attendance Boundaries**
 1. Elementary School Attendance
 2. Middle School Attendance
 3. High School Attendance
 4. Charter School Preference Boundary

**Geographic Overlays**
 1. CPS Networks
 2. Safe Passage Routes
 3. CPS Tiers
 4. Community Areas
 5. Zip Codes
 6. Transit
 7. Bike Paths

**Political Overlays**
 1. Wards
 2. Illinois House District
 3. Illinois Senate District
 4. US Congressional District

##Features
 * Toggle between School Category and School Rating icons
 * Google Street View
 * Link to CPS School Profile
 * Directions by Google
 * Introductory tour
 * LSC Boundaries button



#**How to make a School Locator for your district**

The code posted here is the actual code used in the CPS School Locator so it is particular to the data that is used in CPS. It is not "templetized" - it is a work in progress. It is posted here to show you how we did it and hopefully, help get you started in developing your own locator.

If you have questions regarding the locator, please remember that we have limited resources and time, and it may take us a while to respond.


##Dependencies
 * [Google Fusion Tables] (https://support.google.com/fusiontables/answer/184641)
 * [Google Maps] (https://developers.google.com/maps/documentation/javascript/)
 * [jQuery] (http://jquery.com/)
 * [Hopscotch] (https://github.com/linkedin/hopscotch)
 * [Bootstrap] (http://getbootstrap.com/)
 * [FontAwesome] (http://fortawesome.github.io/Font-Awesome/)
 * [FusionTips] (https://github.com/derekeder/fusiontips)




Copyright (c) 2016 Chicago Public Schools. Released under the MIT License.
