package org.au.nha.admin

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class NhaAdminApplication

fun main(args: Array<String>) {
	runApplication<NhaAdminApplication>(*args)
}
