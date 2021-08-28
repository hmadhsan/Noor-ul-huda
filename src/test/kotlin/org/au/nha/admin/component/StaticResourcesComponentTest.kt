package org.au.nha.admin.component

import org.jsoup.Jsoup
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import org.springframework.http.MediaType.TEXT_HTML
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.expectBody

/**
Have to consume body explicitly when using the exchange method
to avoid reactor.netty.http.client.PrematureCloseException: Connection prematurely closed DURING response

exchange method has been deprecated in WebClient. Update WebTestClient if resolved in been new versions
 **/
@SpringBootTest(webEnvironment = RANDOM_PORT)
@ActiveProfiles("test")
class StaticResourcesComponentTest(
    @Autowired private val webTestClient: WebTestClient,
    @Value("\${server.servlet.contextPath}") private val contextPath: String) {

    @Test
    fun `Should get index page`() {

        webTestClient.get()
            .uri(contextPath)
            .exchange()
            .expectStatus().isOk
            .expectHeader().contentType(TEXT_HTML)
            .expectBody<String>().consumeWith {
                val body = it.responseBody
                assertFalse(body.isNullOrBlank())

                val document = Jsoup.parse(body!!)
                val rootDiv = document.getElementById("root")

                assertNotNull(rootDiv)
            }
    }

    @Test
    fun `Should get js files`() {

        val responseBody = webTestClient.get()
            .uri(contextPath)
            .exchange()
            .expectStatus().isOk
            .expectHeader().contentType(TEXT_HTML)
            .expectBody<String>().returnResult().responseBody

        assertFalse(responseBody.isNullOrBlank())

        val document = Jsoup.parse(responseBody!!)
        val jsLinks = document.select("script").takeLastWhile { it.attributes().hasKey("src") }

        assertEquals(2, jsLinks.size)

        jsLinks.forEach { element ->
            webTestClient.get()
                .uri(element.attr("src"))
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType("application/javascript")
                .expectBody<String>().consumeWith {
                    assertFalse(it.responseBody.isNullOrBlank())
                }
        }
    }
}