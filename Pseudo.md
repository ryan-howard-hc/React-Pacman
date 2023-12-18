### BLINKY

initialize:
    ghost_position = starting_position
    ghost_direction = random_direction
    scatter_mode = False

main_loop:
    if scatter_mode:
        set_target_position_to_corner()  // Go to a corner
    else:
        set_target_position_to_pacman()  // Chase Pac-Man
    
    if ghost_position == target_position:
        choose_next_direction()  // Pick the next direction
    
    move_ghost(ghost_direction)  // Move the ghost in the chosen direction
    check_collisions()  // Check for collisions with walls or other entities
    check_pacman_collision()  // Check if the ghost caught Pac-Man

    if scared_mode:
        change_to_scared_color()
    else:
        revert_to_normal_color()

    if time_to_change_mode():
        if scatter_mode:
            scatter_mode = False
        else:
            scatter_mode = True

### Inky


initialize:
    ghost_position = starting_position
    ghost_direction = random_direction
    scatter_mode = False

main_loop:
    if scatter_mode:
        set_target_position_to_corner()  // Go to a corner
    else:
        set_target_position_to_combined_pacman_blinky()  // Target a position based on Pac-Man and Blinky's positions
    
    if ghost_position == target_position:
        choose_next_direction()  // Pick the next direction
    
    move_ghost(ghost_direction)  // Move the ghost in the chosen direction
    check_collisions()  // Check for collisions with walls or other entities
    check_pacman_collision()  // Check if the ghost caught Pac-Man

    if scared_mode:
        change_to_scared_color()
    else:
        revert_to_normal_color()

    if time_to_change_mode():
        if scatter_mode:
            scatter_mode = False
        else:
            scatter_mode = True

#### Inky behaves somewhat similarly to Blinky but with a twist: its targeting mechanism for its movement is influenced by both Pac-Man's position and Blinky's position. It combines their positions and targets a spot based on that combination.


### Pinky


initialize:
    ghost_position = starting_position
    ghost_direction = random_direction
    scatter_mode = False

main_loop:
    if scatter_mode:
        set_target_position_to_corner()  // Go to a corner
    else:
        set_target_position_to_pacman_front()  // Target a position a few spaces ahead of Pac-Man
    
    if ghost_position == target_position:
        choose_next_direction()  // Pick the next direction
    
    move_ghost(ghost_direction)  // Move the ghost in the chosen direction
    check_collisions()  // Check for collisions with walls or other entities
    check_pacman_collision()  // Check if the ghost caught Pac-Man

    if scared_mode:
        change_to_scared_color()
    else:
        revert_to_normal_color()

    if time_to_change_mode():
        if scatter_mode:
            scatter_mode = False
        else:
            scatter_mode = True


#### Pinky behaves similarly to the other ghosts but targets a position a few spaces ahead of Pac-Man's current direction instead of directly targeting Pac-Man's position.


### Clyde 
#### known for his different behavior compared to the other ghosts. Instead of actively pursuing Pac-Man, Clyde exhibits a mixture of chasing behavior and occasionally moving to a specific location when far away from Pac-Man. Here's a pseudocode representation:

plaintext
Copy code
initialize:
    ghost_position = starting_position
    ghost_direction = random_direction
    scatter_mode = False

main_loop:
    if scatter_mode:
        set_target_position_to_corner()  // Go to a corner
    else:
        if distance(ghost_position, pacman_position) > scatter_threshold:
            set_target_position_to_specific_location()  // Move to a specific location
        else:
            set_target_position_to_pacman()  // Chase Pac-Man
    
    if ghost_position == target_position:
        choose_next_direction()  // Pick the next direction
    
    move_ghost(ghost_direction)  // Move the ghost in the chosen direction
    check_collisions()  // Check for collisions with walls or other entities
    check_pacman_collision()  // Check if the ghost caught Pac-Man

    if scared_mode:
        change_to_scared_color()
    else:
        revert_to_normal_color()

    if time_to_change_mode():
        if scatter_mode:
            scatter_mode = False
        else:
            scatter_mode = True