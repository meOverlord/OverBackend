# Filename: gcp.tf

# Configure GCP project
provider "google" {
  project = "overlord-85d44"
}
# Deploy image to Cloud Run
resource "google_cloud_run_service" "over-backend" {
  name     = "over-backend"
  location = "europe-west1"
  template {
    spec {
      containers {
        image = "eu.gcr.io/overlord-85d44/over-backend"
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}
# Create public access
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}
# Enable public access on Cloud Run service
resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.over-backend.location
  project     = google_cloud_run_service.over-backend.project
  service     = google_cloud_run_service.over-backend.name
  policy_data = data.google_iam_policy.noauth.policy_data
}
# Return service URL
output "url" {
  value = "${google_cloud_run_service.over-backend.status[0].url}"
}
