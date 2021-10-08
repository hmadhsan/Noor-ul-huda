package org.au.nha.admin.contracts.consumer

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.cloud.contract.stubrunner.spring.AutoConfigureStubRunner
import org.springframework.cloud.contract.stubrunner.spring.StubRunnerProperties.StubsMode.REMOTE
import org.springframework.http.HttpHeaders.CONTENT_TYPE
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.reactive.server.WebTestClient

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureStubRunner(
    ids = ["org.au.nha:nha-student-enrolment-service:+:stubs:9091"], stubsMode = REMOTE
)
class StudentEnrolmentServiceConsumerTest(
    @Value("\${nha.host.url}") private val baseUrl: String,
    @LocalServerPort private val port: String
) {

    private lateinit var webTestClient: WebTestClient

    @BeforeEach
    fun setup() {
        webTestClient = WebTestClient.bindToServer().baseUrl("$baseUrl:$port").build()
    }

    @Test
    fun `Should get tajweed enrolments`() {
        webTestClient.get()
            .uri("/api/enrolment/tajweed?status=SUBMITTED&page=0&size=1")
            .header(CONTENT_TYPE, APPLICATION_JSON_VALUE)
            .exchange()
            .expectStatus().isOk
            .expectHeader().contentType(APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.items").exists()
            .jsonPath("$.items[0].id").exists()
            .jsonPath("$.items[0].name").exists()
            .jsonPath("$.items[0].status").exists()
            .jsonPath("$.items[0].contactNumber").exists()
            .jsonPath("$.items[0].email").exists()
            .jsonPath("$.items[0].occupation").exists()
            .jsonPath("$.items[0].marketingMethod").exists()
            .jsonPath("$.items[0].enrolmentReason").exists()
            .jsonPath("$.items[0].applicantSignature").exists()
            .jsonPath("$.items[0].address").exists()
            .jsonPath("$.items[0].address.street").exists()
            .jsonPath("$.items[0].address.suburb").exists()
            .jsonPath("$.items[0].address.state").exists()
            .jsonPath("$.items[0].address.postcode").exists()
            .jsonPath("$.items[0].submissionDate").exists()
            .jsonPath("$.pageNumber").exists()
            .jsonPath("$.pageSize").exists()
            .jsonPath("$.totalPages").exists()
            .jsonPath("$.totalDocuments").exists()
            .jsonPath("$.firstPage").exists()
            .jsonPath("$.lastPage").exists()
    }
}
