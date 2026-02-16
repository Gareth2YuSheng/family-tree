export default function fetchFake() {
  return {
    "debugInfo": "doGet called. Action: read",
    "data": {
      "people": [
        {
          "ID": 1,
          "Full_Name": "George Joestar I",
          "Last_Name": "Joestar",
          "Sex": "Male",
          "Date_Of_Birth": "",
          "Notes": "",
          "Deceased": true
        },
        {
          "ID": 2,
          "Full_Name": "Mary Joestar",
          "Last_Name": "Joestar",
          "Sex": "Female",
          "Date_Of_Birth": "",
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 3,
          "Full_Name": "Jonathan Joestar",
          "Last_Name": "Joestar",
          "Sex": "Male",
          "Date_Of_Birth": "03/04/1886",
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 4,
          "Full_Name": "Erina Joestar",
          "Last_Name": "Joestar",
          "Sex": "Female",
          "Date_Of_Birth": 1950,
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 5,
          "Full_Name": "Dio Brando",
          "Last_Name": "Brando",
          "Sex": "Male",
          "Date_Of_Birth": 1867,
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 6,
          "Full_Name": "George Joestar II",
          "Last_Name": "Joestar",
          "Sex": "Male",
          "Date_Of_Birth": 1889,
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 7,
          "Full_Name": "Elizabeth Joestar",
          "Last_Name": "Joestar",
          "Sex": "Female",
          "Date_Of_Birth": 1888,
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 8,
          "Full_Name": "Joseph Joestar",
          "Last_Name": "Joestar",
          "Sex": "Male",
          "Date_Of_Birth": "27/09/1920",
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 9,
          "Full_Name": "Suzi Q Joestar",
          "Last_Name": "Joestar",
          "Sex": "Female",
          "Date_Of_Birth": "",
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 10,
          "Full_Name": "Higashikata Tomoko",
          "Last_Name": "Higashikata",
          "Sex": "Female",
          "Date_Of_Birth": 1962,
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 11,
          "Full_Name": "Kujo Sadao",
          "Last_Name": "Kujo",
          "Sex": "Male",
          "Date_Of_Birth": "",
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 12,
          "Full_Name": "Kujo Holly",
          "Last_Name": "Kujo",
          "Sex": "Female",
          "Date_Of_Birth": 1942,
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 13,
          "Full_Name": "Shizuka Joestar",
          "Last_Name": "Joestar",
          "Sex": "Female",
          "Date_Of_Birth": 1998,
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 14,
          "Full_Name": "Kujo Jotaro",
          "Last_Name": "Kujo",
          "Sex": "Male",
          "Date_Of_Birth": 1971,
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 15,
          "Full_Name": "Cujoh Jolyne",
          "Last_Name": "Kujo",
          "Sex": "Female",
          "Date_Of_Birth": 1992,
          "Notes": "",
          "Deceased": false
        },
        {
          "ID": 16,
          "Full_Name": "Higashikata Josuke",
          "Last_Name": "Higashikata",
          "Sex": "Male",
          "Date_Of_Birth": 1983,
          "Notes": "",
          "Deceased": false
        }
      ],
      "children": [
        {
          "Child_ID": 3,
          "Child_Name": "Jonathan Joestar",
          "Union_ID": 1,
          "Parents_Names": "George Joestar I & Mary Joestar",
          "Type": "Biological"
        },
        {
          "Child_ID": 6,
          "Child_Name": "George Joestar II",
          "Union_ID": 2,
          "Parents_Names": "Jonathan Joestar & Erina Joestar",
          "Type": "Biological"
        },
        {
          "Child_ID": 8,
          "Child_Name": "Joseph Joestar",
          "Union_ID": 3,
          "Parents_Names": "George Joestar II & Elizabeth Joestar",
          "Type": "Biological"
        },
        {
          "Child_ID": 16,
          "Child_Name": "Higashikata Josuke",
          "Union_ID": 5,
          "Parents_Names": "Joseph Joestar & Higashikata Tomoko",
          "Type": "Biological"
        },
        {
          "Child_ID": 12,
          "Child_Name": "Kujo Holly",
          "Union_ID": 4,
          "Parents_Names": "Joseph Joestar & Suzi Q Joestar",
          "Type": "Biological"
        },
        {
          "Child_ID": 13,
          "Child_Name": "Shizuka Joestar",
          "Union_ID": 4,
          "Parents_Names": "Joseph Joestar & Suzi Q Joestar",
          "Type": "Adopted"
        },
        {
          "Child_ID": 14,
          "Child_Name": "Kujo Jotaro",
          "Union_ID": 6,
          "Parents_Names": "Kujo Sadao & Kujo Holly",
          "Type": "Biological"
        },
        {
          "Child_ID": 15,
          "Child_Name": "Cujoh Jolyne",
          "Union_ID": 7,
          "Parents_Names": "Kujo Jotaro & ???",
          "Type": "Biological"
        },
        {
          "Child_ID": 5,
          "Child_Name": "Dio Brando",
          "Union_ID": 1,
          "Parents_Names": "George Joestar I & Mary Joestar",
          "Type": "Adopted"
        }
      ],
      "unions": [
        {
          "U_ID": 1,
          "Husband_ID": 1,
          "Husband": "George Joestar I",
          "Wife_ID": 2,
          "Wife": "Mary Joestar",
          "Relationship": "Marriage"
        },
        {
          "U_ID": 2,
          "Husband_ID": 3,
          "Husband": "Jonathan Joestar",
          "Wife_ID": 4,
          "Wife": "Erina Joestar",
          "Relationship": "Marriage"
        },
        {
          "U_ID": 3,
          "Husband_ID": 6,
          "Husband": "George Joestar II",
          "Wife_ID": 7,
          "Wife": "Elizabeth Joestar",
          "Relationship": "Marriage"
        },
        {
          "U_ID": 4,
          "Husband_ID": 8,
          "Husband": "Joseph Joestar",
          "Wife_ID": 9,
          "Wife": "Suzi Q Joestar",
          "Relationship": "Marriage"
        },
        {
          "U_ID": 5,
          "Husband_ID": 8,
          "Husband": "Joseph Joestar",
          "Wife_ID": 10,
          "Wife": "Higashikata Tomoko",
          "Relationship": "Affair"
        },
        {
          "U_ID": 6,
          "Husband_ID": 11,
          "Husband": "Kujo Sadao",
          "Wife_ID": 12,
          "Wife": "Kujo Holly",
          "Relationship": "Marriage"
        },
        {
          "U_ID": 7,
          "Husband_ID": 14,
          "Husband": "Kujo Jotaro",
          "Wife_ID": "?",
          "Wife": "???",
          "Relationship": "Marriage"
        }
      ]
    }
  }
}