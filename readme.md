# WP Crontrol #

Contributors: johnbillion, scompt  
Tags: cron, wp-cron, crontrol, debug  
Requires at least: 4.1  
Tested up to: 5.4  
Stable tag: 1.8.4  
Requires PHP: 5.3  

WP Crontrol lets you view and control what's happening in the WP-Cron system.

## Description ##

WP Crontrol lets you view and control what's happening in the WP-Cron system. From the admin screens you can:

 * View all cron events along with their arguments, recurrence, callback functions, and when they are next due.
 * Edit, delete, and immediately run any cron events.
 * Add new cron events.
 * Bulk delete cron events.
 * Add, edit, and remove custom cron schedules.

The admin screen will show you a warning message if your cron system doesn't appear to be working (for example if your server can't connect to itself to fire scheduled cron events).

### Usage ###

1. Go to the `Tools → Cron Events` menu to manage cron events.
2. Go to the `Settings → Cron Schedules` menu to manage cron schedules.

## Frequently Asked Questions ##

### What's the use of adding new cron schedules? ###

Cron schedules are used by WordPress and plugins for scheduling events to be executed at regular intervals. Intervals must be provided by the WordPress core or a plugin in order to be used. As an example, many backup plugins provide support for periodic backups. In order to do a weekly backup, a weekly cron schedule must be entered into WP Crontrol first and then a backup plugin can take advantage of it as an interval.

### How do I create a new cron event? ###

There are two steps to getting a functioning cron event that executes regularly. The first step is telling WordPress about the hook. This is the part that WP Crontrol was created to provide. The second step is calling a function when your hook is executed.

*Step One: Adding the hook*

In the Tools → Cron Events admin panel, click on the "Add Cron Event" tab and enter the details of the hook. You're best off having a hookname that conforms to normal PHP variable naming conventions. The event schedule is how often your hook will be executed. If you don't see a good interval, then add one in the Settings → Cron Schedules admin panel.

*Step Two: Writing the function*

This part takes place in PHP code (for example, in the `functions.php` file from your theme). To execute your hook, WordPress runs an action. For this reason, we need to tell WordPress which function to execute when this action is run. The following line accomplishes that:

	add_action( 'my_hookname', 'my_function' );

The next step is to write your function. Here's a simple example:

	function my_function() {
		wp_mail( 'hello@example.com', 'WP Crontrol', 'WP Crontrol rocks!' );
	}

### How do I create a new PHP cron event? ###

In the Tools → Cron Events admin panel, click on the "Add PHP Cron Event" tab. In the form that appears, enter the schedule and next run time in the boxes. The event schedule is how often your event will be executed. If you don't see a good interval, then add one in the Settings → Cron Schedules admin panel. In the "Hook code" area, enter the PHP code that should be run when your cron event is executed. You don't need to provide the PHP opening tag (`<?php`).

### Which users can manage cron events and schedules? ###

Only users with the `manage_options` capability can manage cron events and schedules. By default, only Administrators have this capability.

### Which users can manage PHP cron events? Is this dangerous? ###

Only users with the `edit_files` capability can manage PHP cron events. This means if a user cannot edit files on the site (eg. through the Plugin Editor or Theme Editor) then they cannot edit or add a PHP cron event. By default, only Administrators have this capability, and with Multisite enabled only Super Admins have this capability.

If file editing has been disabled via the `DISALLOW_FILE_MODS` or `DISALLOW_FILE_EDIT` configuration constants then no user will have the `edit_files` capability, which means editing or adding a PHP cron event will not be permitted.

Therefore, the user access level required to execute arbitrary PHP code does not change with WP Crontrol activated.

### Are any WP-CLI commands available? ###

The cron commands which were previously included in WP Crontrol are now part of WP-CLI (since 0.16), so this plugin no longer provides any WP-CLI commands. See `wp help cron` for more info.

## Screenshots ##

1. New cron events can be added, modified, deleted, and executed<br>![](.wordpress-org/screenshot-1.png)

2. New cron schedules can be added, giving plugin developers more options when scheduling events<br>![](.wordpress-org/screenshot-2.png)

<!-- changelog -->
