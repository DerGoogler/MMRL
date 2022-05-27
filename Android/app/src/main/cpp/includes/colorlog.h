/**
 * A basic C/C++ color log macro.
 *
 * @author Anthony Pena <anthony.pena@outlook.fr>
 * @version 0.0.4
 */
#ifndef __COLOR_LOG__
#define __COLOR_LOG__

#define __LOG_COLOR_RED "1;31"
#define __LOG_COLOR_GREEN "0;32"
#define __LOG_COLOR_BLUE "1;34"
#define __LOG_COLOR_YELLOW "0;33"
#define __LOG_COLOR_WHITE "0;37"

#ifdef _LOG_NO_COLOR
	#define __LOG_COLOR(CLR,CTX,TXT,args...) printf("  %s : "#TXT" \n",CTX,##args)
#else
	#define __LOG_COLOR(CLR,CTX,TXT,args...) printf("  \033[%sm%s : "#TXT" \033[m\n",CLR,CTX,##args)
#endif

#ifdef _LOG_ALL
	
	#ifndef _LOG_VERBOSE
		#define _LOG_VERBOSE
	#endif
	#ifndef _LOG_WARNING
		#define _LOG_WARNING
	#endif
	#ifndef _LOG_ALERT
		#define _LOG_ALERT
	#endif
	#ifndef _LOG_INFO
		#define _LOG_INFO
	#endif
	#ifndef _LOG_SUCCESS
		#define _LOG_SUCCESS
	#endif
#endif

// force disabling coloration on windows systems
#if defined _WIN32 && !(defined _LOG_COLOR)
	#define _LOG_NO_COLOR
#endif

#if defined _LOG_VERBOSE && !(defined _LOG_NO_VERBOSE)
	#include <stdio.h>
	#define VERBOSE(CTX,TXT,args...) __LOG_COLOR(__LOG_COLOR_WHITE,CTX,TXT,##args)
#else
	#define VERBOSE(CTX,TXT,args...)
#endif

#if defined _LOG_WARNING && !(defined _LOG_NO_WARNING)
	#include <stdio.h>
	#define WARNING(CTX,TXT,args...) __LOG_COLOR(__LOG_COLOR_YELLOW,CTX,TXT,##args)
#else
	#define WARNING(CTX,TXT,args...)
#endif

#if defined _LOG_INFO && !(defined _LOG_NO_INFO)
	#include <stdio.h>
	#define INFO(CTX,TXT,args...) __LOG_COLOR(__LOG_COLOR_BLUE,CTX,TXT,##args)
#else
	#define INFO(CTX,TXT,args...)
#endif

#if defined _LOG_ALERT && !(defined _LOG_NO_ALERT)
	#include <stdio.h>
	#define ALERT(CTX,TXT,args...) __LOG_COLOR(__LOG_COLOR_RED,CTX,TXT,##args)
#else
	#define ALERT(CTX,TXT,args...)
#endif

#if defined _LOG_SUCCESS && !(defined _LOG_NO_SUCCESS)
	#include <stdio.h>
	#define SUCCESS(CTX,TXT,args...) __LOG_COLOR(__LOG_COLOR_GREEN,CTX,TXT,##args)
#else
	#define SUCCESS(CTX,TXT,args...)
#endif

#endif /* __COLOR_LOG__*/
