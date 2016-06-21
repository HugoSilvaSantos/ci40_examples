#include <unistd.h>
#include <string.h>
#include "click/relay2.h"
#include "core/common.h"
#include <stdio.h>


int main(int argc, char ** argv)
{
	char *cmd = NULL;
	if (argc < 2) {
		fprintf(stderr, "Not enough arguments.\n");
		return -1;
	}

	cmd = argv[1];

	if (strcmp(cmd, "on") == 0) {
		printf("ON\n");
		relay2_click_enable_relay_1(MIKROBUS_1);
		relay2_click_enable_relay_2(MIKROBUS_2);

	} else if (strcmp(cmd, "off") == 0) {
		printf("OFF\n");
		relay2_click_disable_relay_1(MIKROBUS_1);
		relay2_click_disable_relay_2(MIKROBUS_2);

	} else {
                printf("Invalid command\n" );
		return -1;
        }

	return 0;
}
