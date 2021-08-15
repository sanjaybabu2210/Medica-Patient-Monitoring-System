# Medica-Patient-Monitoring-System
Medica (Patient Monitoring System) we made a platform to monitor patients in each bed under each ward of a hospital. With mobile app and website. which shows the vital and heart pulse level of the patient lively in the app.With control over the saline water level. And the patient will have one account in medica site where the doctor can access through all there previous records, prescription and scan copy.
Gear to manage Online Medical Record of patients
## What it does
1. Manages two separate login for doctor and patient with SignUp.
2. Doctor can able to access and update pateint progress, report, symptoms and treatment along with scanned copy of patient
By entering valid ID and OTP of the patient.
3. The portal also show live update from the Medica mobile App Once the doctor add prescription of the patient

## How to run it
```
1) git clone https://github.com/sanjaybabu2210/Medica-Patient-Monitoring-System
2) cd Medica-Patient-Monitoring-System
3) node app.js
```
Then provide with the Database access with your own mongoDB password and Cloudinary access with api secret by creating the account. Also provide nodemailer with emailId and password
## Its advantage
Whenever Patients switches the doctor in case of location transfer or any other reason It helps to keep track of all medical records in a database
to overcome the misplace and lost of medical records by the patient.


## Target audience
Patients, doctors and nurses.
## Tech stack
1. Web Development (HTML, CSS, Bootstrap, JS,Node.js).
2. IoT and Physics.
3. MongoDB.
4. FireStore.
5. heroku
## What's next
We intend to add more features suggested by industry professionals to help improve the Portal and link with Adhar ID of the patient.



# You can pretty print json responses by using pipe operator and
# the following commands: `| python -mjson.tool` or `| jq`.
# If needed, install `jq`in OSX: `brew install jq`

# All note ids are using UUIDv4

# GET a list of notes
curl \
--request GET \
http://localhost:3000/api/v1/notes

# Get a single note
curl \
--request GET \
http://localhost:3000/api/v1/notes/:id

# Create a single note
curl \
--header "Content-Type: application/json" \
--request POST \
--data '{"title": "Test Title", "body": "Test note"}' \
http://localhost:3000/notes

# Update a note
curl \
--header "Content-type: application/json"
--request PUT \
--data '{"title:": "Updated title", "body": "Updated note"}' \
http://localhost:3000/notes/:id

# Delete a note
curl \
--header "Content-type: application/json" \
--request DELETE \
http://localhost:3000/notes/:id

