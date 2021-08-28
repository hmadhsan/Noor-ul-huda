package org.au.nha.admin.config.routes

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import org.springframework.http.MediaType.TEXT_HTML
import org.springframework.web.reactive.function.server.router

@Configuration
class IndexPageRoute {

    @Bean
    fun indexRouter(
        @Value("\${server.servlet.contextPath}") contextPath: String,
        @Value("classpath:/public/index.html") indexHtml: Resource
    ) = router {
        GET(contextPath) {
            ok().contentType(TEXT_HTML).bodyValue(indexHtml)
        }
    }
}